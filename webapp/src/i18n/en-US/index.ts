export default {
    global: {
        fields: {
            email: {
                label: "Email",
            },
            password: {
                label: "Password",
            },
            companyName: {
                label: "Company Name",
            },
            projectName: {
                label: "Project Name",
            },
            fullName: {
                label: "Full Name",
            },
            phone: {
                label: "Phone",
            },
            street: {
                label: "Street",
            },
            city: {
                label: "City",
            },
            zip: {
                label: "Zip",
            },
            country: {
                label: "Country",
            },
            yes: {
                label: "Yes",
            },
            no: {
                label: "No",
            },
            cancel: {
                label: "Cancel",
            },
            reset: {
                label: "Reset",
            },
            apply: {
                label: "Apply",
            },
            close: {
                label: "Close",
            },
            goBack: {
                label: "Go Back",
            },
            submit: {
                label: "Submit",
            },
            save: {
                label: "Save",
            },
            add: {
                label: "Add",
            },
            remove: {
                label: "Remove",
            },
            search: {
                placeholder: "Search",
            },
        },
        labels: {
            projects: "Projects",
            users: "Users",
            details: "Informations",
            projectSettings: "Project Settings",
            projectInformations: "Project Informations",
            customerAccount: "Customer Account",
            businessUnits: "Business Units",
            dashboard: "Dashboard",
            scanAssets: "Manage Asset scan",
            scanParameters: "Scan Parameters",
            about: "About",
            privacyPolicy: "Privacy Policy",
            contact: "Contact",
            or: "or",
            advancedFilters: "Advanced Filters",
        },
    },
    noTest: {
        title: "No test to show",
        description: "No test has been completed yet.",
    },
    signIn: {
        title: "Sign-in",
        fields: {
            submit: {
                label: "Sign-in",
            },
        },
        requestPassword: "I lost my password",
        mentions: {
            intro: "You don't have a customer account? {0}",
            contact: "Contact Sales",
            trial: "try our solution now.",
        },
    },
    passwordRequest: {
        title: "Request a new password",
        fields: {
            submit: {
                label: "Request",
            },
        },
        notifications: {
            success: "An email has been sent to you.",
        },
    },
    passwordReset: {
        title: "Reset your password",
        fields: {
            password: {
                label: "New password",
            },
            passwordConfirm: {
                label: "Confirm new password",
            },
            submit: {
                label: "Reset",
            },
        },
        notifications: {
            success: "Password successfully changed.",
        },
    },
    user: {
        mySettings: {
            title: "My Settings",
            fields: {
                logout: {
                    label: "Logout",
                },
                privacyPolicy: {
                    label: "Privacy Policy",
                },
            },
        },
    },
    projects: {
        allProjects: {
            label: "All projects",
        },
    },
    launchScan: {
        label: "Launch Scan",
        arguments: {
            continue: "Continue current test",
            force: "New test",
        },
    },
    scanStatus: {
        labels: {
            executing: "Scan in progress",
            completed: "Scan completed",
            failed: "Scan failed",
            aborted: "Scan aborted",
            paused: "Scan paused",
            pending: "Scan pending",
            cleaned: "Scan cleaned",
            noScan: "No scan",
        },
        stats: "{countDomains} Domains / {countApplications} Applications",
    },
    partnerAccount: {
        actions: {
            createProject: "Create a project",
            addUser: "Add/invite a user",
        },
        fields: {
            projectName: {
                label: "Project name",
            },
            projectItems: {
                label: "Workqueue items",
            },
            submit: {
                label: "Create",
            },
        },
        titles: {
            createProject: "Add a new project",
            addUser: "Add a new user / Invite an existing user",
        },
    },
    accountInfos: {
        title: "Account Infos",
        fields: {
            companyName: {
                label: "Company Name",
            },
            mainContact: {
                label: "Main Contact",
            },
            billingAddress: {
                label: "Billing Address",
            },
            billingContact: {
                label: "Billing Contact",
            },
            cancelClose: {
                label: "Cancel / Close",
            },
            addInvite: {
                label: "Add / Invite",
            },
            projects: {
                label: "Projects",
            },
            users: {
                label: "Users",
            },
            partnerAccount: {
                label: "Information",
            },
            checkbox: {
                label: "Same as Main Contact",
            },
        },
        columns: {
            name: "Name",
            date: "Test last executed on",
            level: "Criticity level",
        },
        list: "List of users that have access to the project",
    },
    businessUnits: {
        title: "Business Units",
        indicators: {
            empty: "Nothing to show here",
            applications: "Discovery",
            hygiene: "Hygiene Indicators",
            actions: "Attack Surface Reduction",
        },
        labels: {
            domains: "{count} Domains",
            businessUnits: "{count} Business Units",
            summary: "Test summary",
            nodeSummary: "{name} - {type} summary",
        },
        types: {
            domain: "Domain",
            businessUnit: "Business Unit",
        },
    },
    heatmap: {
        title: "Heatmap",
        header: {
            buttons: {
                assetList: "Asset List",
            },
        },
    },
    assetList: {
        id: {
            name: "Id",
        },
        name: {
            name: "Name",
        },
        port: {
            name: "Port",
        },
        "Instance of": {
            name: "Instance of",
        },
        "clear http": {
            name: "Clear http",
        },
        status: {
            name: "Status",
        },
        server: {
            name: "Server",
        },
        techno: {
            name: "Techno",
        },
        exposure: {
            name: "Exposure",
        },
        sm: {
            name: "SM",
        },
        pcm: {
            name: "PCM",
        },
        dod: {
            name: "DOD",
        },
        aut: {
            name: "AUT",
        },
        iv: {
            name: "IV",
        },
        act: {
            name: "ACT",
        },
        cs: {
            name: "CS",
        },
        screenshot: {
            name: "Screenshot",
        },
        need_action: {
            name: "Need Action",
        },
        invalid_ssl_cert: {
            name: "Invalid ssl cert",
        },
        cookie_consent_defect: {
            name: "Cookie consent defect",
        },
        privacy_policy_defect: {
            name: "Privacy policy defect",
        },
        suspicious_app: {
            name: "Suspicious app",
        },
        old_component: {
            name: "Old component",
        },
        cname: {
            name: "Cname",
        },
        risk: {
            name: "Risk",
        },
        risk_weight: {
            name: "Risk weight",
        },
        category_type: {
            name: "Category type",
        },
        srv_category_name: {
            name: "Srv category name",
        },
        href_misconfig: {
            name: "Href misconfig",
        },
        subdomain_takeover_risk: {
            name: "Subdomain takeover risk",
        },
        responsive_ip: {
            name: "Responsive ip",
        },
        live_asset: {
            name: "Live asset",
        },
        security_program: {
            name: "Security program",
        },
        onboarding_date: {
            name: "Onboarding date",
        },
        owner: {
            name: "Owner",
        },
        business_criticality: {
            name: "Business criticality",
        },
        update_frequency: {
            name: "Update frequency",
        },
        manual_complexity: {
            name: "Manual complexity",
        },
        program_recommendation: {
            name: "Program recommendation",
        },
        bu_name: {
            name: "Business Unit",
        },
        buttons: {
            tooltip: {
                export: "Export Asset list",
                resetIndicatorFilter: "Reset indicator filter",
            },
            rowPerPage: "Rows per page",
        },
    },
    manageAssets: {
        items: "Items",
        type: "Type",
        findingFrom: "Finding from",
        findingFromType: "Finding from type",
        scanMode: "Scan Mode",
        createdAt: "Created at",
        updatedAt: "Updated at",
        statusDetail: "Status detail",
        status: "Status",
        trust: "Trust",
        used: "Use",
        domain: "Domain",
        duration: "Duration",
        comments: "Comments",
        fields: {
            add: "Add",
            addItem: "Add an item",
            scanType: "Scan type",
            scanTypeSelect: {
                static: "Static",
                deep: "Deep Discovery",
            },
        },
        buttons: {
            tooltip: {
                addItem: "Add an item",
            },
        },
    },
    indicators: {
        domain_for_sale: "Domain for sale",
        forbidden: "Forbidden",
        "likely url": "Likely URL",
        likely_uri: "Likely URI",
        live_apps: "Live apps",
        not_found: "Not found",
        sso: "SSO",
        third_party: "Third party",
        cookie_consent_issue: "Cookie consent issue",
        invalid_cert: "Invalid certificate",
        privacy_policy_issue: "Privacy policy issue",
        responsive_ip: "Responsive IP",
        web_srv_default_page: "Web server default page",
        clear_login_form: "Clear login form",
        old_components: "Old components",
        fix: "Fix",
        protect: "Protect",
        onboard: "Onboard",
        remove: "Remove",
        http_responsive_ip: "HTTP responsive IP",
        suspicious_subdomain: "Suspicious subdomain",
        subdomain_takeover: "Subdomain takeover",
        redirecting: "Redirecting",
        refused: "Refused",
        href_misconfiguration: "Href misconfiguration",
    },
    scanParameters: {
        title: "Scan Parameters",
        fields: {
            parameters: "Parameters",
            blacklist: "Blacklist",
            globalTinyList: "GlobalTinylist",
            HTTPList: "HTTP List",
            HTTPSList: "HTTPS List",
            configuration: "Configuration",
        },
    },
    errors: {
        passwordMismatching: "Password and confirmation must be the same",
        invalidAccountId: "No account with this id",
        invalidProjectId: "No project with this id",
        invalidTestId: "No test with this id",
        fileNotFound: "File not found",
    },
};
