(function () {

    var takePicture = document.querySelector("#take-picture"),
        showPicture = document.querySelector("#show-picture"),
        deliverPicture = document.querySelector("#deliver-picture"),
        name = document.querySelector("#name"),
        email = document.querySelector("#email");

    if (takePicture && showPicture && deliverPicture && name && email) {
        // Set events
        takePicture.onchange = function (event) {
            // Get a reference to the taken picture or chosen file
            var files = event.target.files,
                file;

            if (files && files.length > 0) {
                file = files[0];

                try {
                    // Get window.URL object
                    var URL = window.URL || window.webkitURL;

                    // Create ObjectURL
                    var imgURL = URL.createObjectURL(file);

                    // Set img src to ObjectURL
                    showPicture.src = imgURL;

                    // Revoke ObjectURL
                    URL.revokeObjectURL(imgURL);
                }
                catch (e) {

                    try {
                        // Fallback if createObjectURL is not supported
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showPicture.src = event.target.result;
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        // Display error message
                        var error = document.querySelector("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }

		// if file exists, then lets set up delivery

		deliverPicture.onclick = function (buttonEvent) {

		    if (name.value && email.value) {

			var metaPhoto = JSON.stringify({"name": name.value, "email": email.value});
			var xhr = new XMLHttpRequest();
			
			xhr.onreadystatechange = function () {

			    var postResponse, imagePutRequest, rev;

			    if (xhr.readyState === 4 && (xhr.status === 201 || xhr.status === 200)) {

				postResponse = JSON.parse(xhr.responseText);
				// due to update function, rev is actually in a header called "X-Couch-Update-NewRev"
				rev = xhr.getResponseHeader("X-Couch-Update-NewRev");
				alert(rev);
				imagePutRequest = new XMLHttpRequest();
				imagePutRequest.open('PUT', '/burma/' + postResponse.id + '/attachment?rev=' + rev);
				imagePutRequest.setRequestHeader('Content-Type', file.type);

				imagePutRequest.send(file);
			    }
			};
		
			xhr.addEventListener('error', function(event) {
			    alert('error');
			});

			xhr.open('POST', '/burma/_design/burma-photo/_update/add_timestamp');

			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.send(metaPhoto);
		    }
		};		
            }
        };
    }
})();
