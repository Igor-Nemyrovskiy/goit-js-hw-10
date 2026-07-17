import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const delay = Number(formData.get("delay"));
    const state = formData.get("state");

    const result = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
    
    result
      .then(delay => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: "topRight",
        });
    })
      .catch(delay => {
        iziToast.error({
          message: `❌ Rejected promise in ${delay}ms`,
          position: "topRight",
        });
      });
  event.target.reset();

}

