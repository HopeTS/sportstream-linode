/**
 *    This array contains all the links displayed in the mobile and desktop
 *    navigation ui components.
 */

export default [
    /**
     *  Link attributes:
     *  ----------------
     *  href: string = the internal route or external link
     *  text: string = the label of the navigation component
     *  internal: bool = whether href is internal or external
     *  auth: object (todo) = {
     *      strict: bool = whether auth_status matters
     *      auth_status: bool = whether or not user is logged in
     *  }
     *  sublinks: array = [
     *      sublink: object = {
     *          text: string = the label of the sublink
     *          href: string = the internal or external link
     *          internal: bool = whether href is internal or external
     *          auth: object (todo) = {
     *              strict: bool = whether auth_status matters
     *              auth_status: bool = whether or not user is logged in
     *          }
     *      }
     *  ]
     */
    {
        href: "/",
        text: "Home",
        internal: true
    }, {
        href: "/watch",
        text: "Watch",
        internal: true
    }
]