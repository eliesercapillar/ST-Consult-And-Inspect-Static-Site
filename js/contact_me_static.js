document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    //const testGoogleFormsURL = "https://docs.google.com/forms/d/e/1FAIpQLScAIdBzcPpkGF49f9xFK54mS9b3TaE2h_YD40sX5hBGZ2KqLA/formResponse";
    const googleFormsURL = "https://docs.google.com/forms/d/e/1FAIpQLSebjGodexNAKv71DnvvMPumpvqNIVK2K9wFhCVcheu05nCE5g/formResponse"

    //ISSUE:
    //    If Google experiences an issue (e.g., their servers are down, the form is deleted, or they change how the API works), 
    //    the site will still show a success message even though the submission failed.
    //    This can lead to silent data loss.

    //SOL: (This is for when the site is no longer a static site.)
    //    When there exists a server, form data should be sent to your server, and logged there.
    //    That way, the server contains all form submissions.
    //    If desired, we can still forward the form data to Google Forms.

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents default form submission behavior

        const formData = new FormData(form);

        fetch(googleFormsURL, {
            method: "POST",
            body: formData,
            mode: "no-cors", // Prevents CORS issues since Google Forms does not return a response
        })
        .then(() => {
            // Show success message
            const promptDiv = document.getElementById("submission-prompt");
            if (promptDiv) {
                promptDiv.style.display = "block";
                promptDiv.innerHTML = `<div class='alert alert-success'>
                                        <button type='button' class='close' onclick="this.parentElement.style.display='none'">&times;</button>
                                        <strong>Your message has been sent. </strong>
                                       </div>`;
            }

            form.reset(); // Clears the form fields
        })
        .catch(() => {
            // Show error message
            const promptDiv = document.getElementById("submission-prompt");
            if (promptDiv) {
                promptDiv.style.display = "block";
                promptDiv.innerHTML = `
                                    <div class='alert alert-danger'>
                                        <button type='button' class='close' onclick="this.parentElement.style.display='none'">&times;</button>
                                        <strong>There was an error sending your message. If the error persists, please try calling us instead!</strong>
                                    </div>`;
            }
        });
    });
});
