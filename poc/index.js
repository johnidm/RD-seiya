const Seyia = (function() {

    const baseUrl = 'http://localhost:5000/track/'
    
    let getOrCreateGUID = function() {
        
        const keyStorage = 'seyia-guid';

        function getNewGUID() {
            // http://guid.us/GUID/JavaScript
            function S4() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
            }
            return guid = (S4() + S4() + '-' + S4() + '-4' + S4().substr(0,3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
        }        

        let guid = sessionStorage.getItem(keyStorage);
        if (guid === null) {
            guid = getNewGUID();
            sessionStorage.setItem(keyStorage, guid);
        }        
        return guid;
    };

    let httpPost = function(trackPath, data) {
    
        let guid = getOrCreateGUID();
        let url = baseUrl + trackPath + '/' + guid

        let xhttp = new XMLHttpRequest();      
        
        xhttp.open('POST', url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(data));
    
        xhttp.onreadystatechange = function() {
            console.log(xhttp.responseText);
            if (xhttp.status !== 204) {
                console.error(xhttp);
            }
        }
    };

    return {

        trackUrl(url) {
            let title = document.title;
            
            data = {
                title: title,
                url: url,
                date: new Date()
            }
    
            httpPost('url', data);
        },

        setEmail(email) {
            
            let data = { 
                email:email
            };
            
            httpPost('email', data);
        },

        get guid() {
            return getOrCreateGUID();
        }

    };
})();