<template>
    <button-action
        class="text-subtitle2 text-weight-bold"
        icon="export"
        color="grey-3"
        textColor="grey-7"
        colorHover="gold"
        textColorHover="grey-1"
        :attrs="attrs"
        :label="label"
        @click="handleClickDownload"
    />
</template>

<script setup lang="ts">
import { exportFile, QBtnProps } from "quasar";
import ButtonAction from "src/components/ButtonAction.vue";
import { Matrix } from "src/types/Matrix";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { TableCell } from "src/types/TableCell";
import { computed } from "vue";
import { useMatrixStore } from "src/stores/matrix.store";

const matrixStore = useMatrixStore();

const props = defineProps<{
    attrs?: QBtnProps;
    label: string;
    fileTitle: string;
    matrix: Matrix;
    mode: "PDF" | "ACTRIX" | "PDF FULL";
    cells?: TableCell[];
}>();

const cellsWithoutDeterminant = computed(() => {
    return props.cells?.filter(
        cell => cell.type !== "determinant" && cell.type !== "header"
    );
});

const getNthCol = (col: number) => {
    const filledCol = [];
    let index = 0;

    for (const cell of cellsWithoutDeterminant.value || []) {
        if (index % matrixStore.matrixWidth === 0) {
            filledCol.push(cell);
        }
        if ((index % matrixStore.matrixWidth) - 1 === col) {
            filledCol.push(cell);
        }
        index++;
    }
    return filledCol;
};

const formatTitle = (title: string): string[] => {
    const half = Math.floor(title.length / 2);
    const nextSpaceIndex = title.indexOf(" ", half);
    if (nextSpaceIndex !== -1) {
        return [title.substring(0, nextSpaceIndex), title.substring(nextSpaceIndex + 1)];
    }
    const nextDashIndex = title.indexOf("-", half);
    if (nextDashIndex !== -1) {
        return [title.substring(0, nextDashIndex), title.substring(nextDashIndex + 1)];
    }
    const nextCommaIndex = title.indexOf(",", half);
    if (nextCommaIndex !== -1) {
        return [title.substring(0, nextCommaIndex), title.substring(nextCommaIndex + 1)];
    }

    return [title];
};

const getBody = (col: number) => {
    const body = [];
    let offset = 0;
    const data = getNthCol(col);
    for (let index = 0; index < matrixStore.matrixWidth; index++) {
        body.push([
            data[0 + offset].title!,
            data[1 + offset].criteria
                ?.filter(criteria => {
                    if (criteria.impactedActionsIds === undefined || criteria.impactedActionsIds.length === 0 || props.mode === "PDF FULL") {
                        return true;
                    }
                    return criteria.impactedActionsIds?.some(id => {
                        const action = data[1 + offset].actions?.find(action => action.id === id);
                        if (action === undefined) { return false; }
                        return ((action.type === "progress" && action.state !== "done") || (action.type === "checkbox" && action.checked === false));
                    });
                })
                .map(criteria => criteria.title)
                .join(",\n\n") || [], data[1 + offset].actions
                ?.filter(action => {
                    return ((props.mode === "PDF FULL") || (action.type === "progress" && action.state !== "done") || (action.type === "checkbox" && action.checked === false));
                })
                .map(action => action.title)
                .join(",\n\n") || [],
        ]);
        offset += 2;
    }
    return body;
};
const handleClickDownload = async () => {
    if (props.mode === "ACTRIX") {
        exportFile(
            props.fileTitle + ".actrix",
            JSON.stringify(props.matrix),
            "json"
        );
    } else {
        // eslint-disable-next-line new-cap
        const doc = new jsPDF({ orientation: "landscape" });
        doc.setFontSize(56).text(props.matrix.title, 148, 20, {
            align: "center",
        });
        for (
            let index = 0;
            index <
            cellsWithoutDeterminant.value!.length / matrixStore.matrixWidth - 1;
            index++
        ) {
            doc.setFontSize(24)
                .text(formatTitle(props.matrix.determinantsKeys[index].title), 148, 40, {
                    align: "center",
                })
                .setFillColor(0, 214, 121);

            autoTable(doc, {
                head: [["", "Déterminants", "Actions"]],
                body: getBody(index),
                startY: 40,
                theme: "grid",
                styles: {
                    fontSize: 12,
                    overflow: "linebreak",
                    cellPadding: 2,
                    valign: "middle",
                },
                columnStyles: {
                    0: { cellWidth: 50 },
                },
            });
            doc.addPage();
        }
        doc.save(`${props.matrix.title}.pdf`);
    }
};
</script>
