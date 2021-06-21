var deviceName = document.getElementById('device-name');
var deviceType = document.getElementById('device-type');
var deviceNumber = document.getElementById('device-number')
var token = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJ1c2VySWQiOiIwODMzNTNiMC02YWQyLTExZWItOWJiNC03MzRlODg0MDRjZGIiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiMDcyNDdiYzAtNmFkMi0xMWViLTliYjQtNzM0ZTg4NDA0Y2RiIiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjE0Nzc1OTExLCJleHAiOjE2MTQ3ODQ5MTF9.mjTN4M-MWNxAwuhVx4IfKuMw8nDA3wvRKKvsrbE4Q2uklXgm4gToVHmEDjdRz5IH20X2KOoR5MJ9mtB6UuDQ5A`


document.getElementById('btnApi').addEventListener('click', () => {
    var deviceNumberValue = parseInt(deviceNumber.value); 

    for (var i = 0; i < deviceNumberValue; i++) {
        var val = {
            name: `${deviceName.value} ${i}`,
            type: `${deviceType.value}`
        }
        var raw = JSON.stringify({
            "name": `${val.name}`,
            "type": `${val.type}`,
            "deviceProfileId": {
                "entityType": "DEVICE_PROFILE",
                "id": "0741eed0-6ad2-11eb-9bb4-734e88404cdb"
            }

        });
        var requestOptions = {
            method: 'POST',
            body: raw,
            headers: new Headers({
                'Content-type': 'application/json',
                'Accept': 'application/json',
                "X-Authorization": token
            }),
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/device", requestOptions)
            .then(response => response.json())
            .then(result => {
                $.each(requestOptions, (key, value) => {
                    console.log('Yapılan İşlemin Bilgileri , ' + key + " :" + value);
                })
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    }
});


//* GET DEVICE PROFILES
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: ({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Authorization": token
    }),
};

fetch("http://localhost:8080/api/deviceProfiles?pageSize=10&page=0", requestOptions)
    .then(response => {
        return response.json();
    })
    .then(result => {
        document.getElementById('btnDeviceProfiles').addEventListener('click', () => {
            for (let key in result) {
                let content = document.querySelector('.content');
                var html = `
                    <div class="card mt-4" style="width: 18rem;">
                        <div class="card-body">
                        <img class="card-img-top mb-3" src="thermostat.png" alt="Thermostat Image">
                            <h5 class="card-title">EXISTING DEVICE PROFILES</h5>
                            <p class="card-text ">1) DEVICE NAME : ${result.data[0].name}      </p>
                            <p class="card-text"> Description: ${result.data[0].description}      </p>
                            <p class="card-text">2) DEVICE NAME : ${result.data[1].name}      </p>
                            <p class="card-text"> Description : ${result.data[1].description}      </p>
                            <a href="http://localhost:8080/deviceProfiles" target="_blank" class="btn btn-primary">Go Web Page</a>
                        </div>
                    </div>
                    `;
                content.innerHTML = html;
            }
        });

    })
    .catch(err => {
        console.log(err);
    });
