/**
 * Array containing all of the links displayed in the mobile and desktop
 * navigation components
 */
const links: {
    href: string;
    text: string;
    internal?: boolean;
    auth?: {
        strict?: boolean;
        auth_status?: boolean;
    };
    sublinks?: {
        text: string;
        href: string;
        internal?: boolean;
        auth?: {
            strict?: boolean;
            auth_status?: boolean;
        }
    };
}[] = [{
    href: "/dashboard",
    text: "Dashboard",
    internal: true
}]


export = links;