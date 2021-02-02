
/**
 * Generates link for flv Livestream with given id
 * 
 * @param {String} streamKey 
 * 
 * @returns {String} Stream link
 */
export default (link) => {
    let links = [];

    links.push(`rtmp://${window.location.host}/live/${link}`);
    links.push(`http://${window.location.hostname}:8000/live/${link}.flv`);
    links.push(`ws://${window.location.hostname}:8000/live/${link}.flv`);
    links.push(`http://${window.location.hostname}:8000/live/${link}/index.m3u8`);
    links.push(`http://${window.location.hostname}:8000/live/${link}/index.mpd`);
    return links;
}