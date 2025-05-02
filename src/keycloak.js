import axios from 'axios';
import Keycloak from 'keycloak-js'

const cloakAuth = new Keycloak({
    url: "http://localhost:8080",
    realm: "myrealm",
    clientId: "myclient"
});

const httpClient = axios.create({

});

    
cloakAuth.init({
    onLoad: 'check-sso',
    clickLoginIframe: true,
    pkceMethod: 'S256',
    silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
}).then((auth) => {
    if (!auth) {
        console.log("Not Authinticated");

        window.location.reload();
    }
    else {
        console.info('Authinticated')
        console.log('auth', auth);
        console.log('keycloak', cloakAuth);
        console.log('Access token', cloakAuth.token);
        httpClient.defaults.headers.common['Authorization'] = `Bearer ${cloakAuth.token}`;

        cloakAuth.onTokenExpired = () => {
            console.log("Token expired");

        }
    }
}, () => {
    console.error("Authentication Failed");
})

export default cloakAuth