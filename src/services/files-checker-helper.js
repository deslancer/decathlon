export default function linkCheck( url ) {
    let http = new XMLHttpRequest();
    http.open( 'HEAD', url, false );
    http.send();
    return http.status !== 404;
}
