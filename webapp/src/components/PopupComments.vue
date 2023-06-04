<template>
    <q-card class="q-pa-lg">
        <q-chat-message
            v-for="comment in regroupFollowingComments()"
            :key="comment.date + comment.userEmail"
            :name="comment.userName"
            :text="comment.comments"
            :sent="comment.userEmail === userProfileStore.user?.email"
            size="6"
            text-color="white"
            :bg-color="
                comment.userEmail === userProfileStore.user?.email
                    ? 'blue'
                    : 'green'
            "
        />
        <!-- :stamp="getElapsedTime(comment.date)" -->

        <q-input
            standout
            bottom-slots
            v-model="text"
            clearable
            bg-color="grey-4"
            placeholder="Ajouter un commentaire"
        >
            <template v-slot:after>
                <q-btn round dense flat icon="send" @click="addComment" />
            </template>
        </q-input>
    </q-card>
</template>

<script setup lang="ts">
import { useMatrixStore } from "src/stores/matrix.store";
import { useUserProfileStore } from "src/stores/userProfile.store";
import { Matrix } from "src/types/Matrix";
import { ref } from "vue";

const userProfileStore = useUserProfileStore();
const matrixStore = useMatrixStore();

const props = defineProps<{
    currentMatrix: Matrix;
}>();

const text = ref("");

const addComment = () => {
    if (text.value.length > 0) {
        matrixStore.addComment({
            userEmail: userProfileStore.user?.email ?? "",
            userName: userProfileStore.user?.displayName ?? "",
            comment: text.value,
            date: new Date().toISOString(),
        });
        text.value = "";
    }
};

interface MatrixComment {
    userEmail: string;
    userName: string;
    comments: string[];
    date: string;
}

const regroupFollowingComments = (): MatrixComment[] => {
    const comments = props.currentMatrix.comments;
    const groupedComments: MatrixComment[] = [];

    for (let i = 0; i < comments.length;) {
        const comment = comments[i];
        const currentGroup = {
            userEmail: comment.userEmail,
            userName: comment.userName,
            comments: [comment.comment],
            date: comment.date,
        };
        let j = i;
        let count = 1;
        let nextComment = comments[j + 1];
        while (
            j < comments.length - 1 && comment.userEmail === nextComment.userEmail) {
            currentGroup.comments.push(nextComment.comment);
            count++;
            j++;
            nextComment = comments[j + 1];
        }
        i += count;
        groupedComments.push(currentGroup);
    }

    return groupedComments;
};

// const getElapsedTime = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diff = now.getTime() - date.getTime();
//     const seconds = Math.floor(diff / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const months = Math.floor(days / 30);
//     const years = Math.floor(months / 12);
//     if (years > 0) {
//         return `Il y a ${years} an${years > 1 ? "s" : ""}`;
//     }
//     if (months > 0) {
//         return `Il y a ${months} mois`;
//     }
//     if (days > 0) {
//         return `Il y a ${days} jour${days > 1 ? "s" : ""}`;
//     }
//     if (hours > 0) {
//         return `Il y a ${hours} heure${hours > 1 ? "s" : ""}`;
//     }
//     if (minutes > 0) {
//         return `Il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
//     }
//     if (seconds > 0) {
//         return `Il y a ${seconds} seconde${seconds > 1 ? "s" : ""}`;
//     }
//     return "à l'instant";
// };
</script>
