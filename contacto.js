document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('[data-contact-form]');
    const successMessage = document.querySelector('[data-form-success]');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita el recargo de página
            let isValid = true;

            // Limpiar errores previos
            contactForm.querySelectorAll('.error').forEach(el => el.textContent = '');

            // Campos a validar
            const fields = ['nombre', 'email', 'mensaje'];
            const formData = {}; // Objeto para guardar los valores del formulario

            fields.forEach((fieldName) => {
                const input = contactForm.querySelector(`#${fieldName}`);
                const errorSpan = contactForm.querySelector(`[data-error-for="${fieldName}"]`);

                if (!input.value.trim()) {
                    isValid = false;
                    if (errorSpan) errorSpan.textContent = 'Este campo es obligatorio.';
                } else if (fieldName === 'email' && !validateEmail(input.value)) {
                    isValid = false;
                    if (errorSpan) errorSpan.textContent = 'Ingresá un correo electrónico válido.';
                } else {
                    // Si el campo es válido, guardamos su valor en formData
                    formData[fieldName] = input.value.trim();
                }
            });

            // Si todo está correcto, guardamos en localStorage y simulamos el éxito
            if (isValid) {
                // 1. Obtener los mensajes previos guardados o iniciar un arreglo vacío
                const mensajesPrevios = JSON.parse(localStorage.getItem('contactos_hj')) || [];

                // 2. Agregar la fecha/hora y el nuevo mensaje
                formData.fecha = new Date().toLocaleString('es-AR');
                mensajesPrevios.push(formData);

                // 3. Guardar el arreglo actualizado en localStorage
                localStorage.setItem('contactos_hj', JSON.stringify(mensajesPrevios));

                // 4. Limpiar formulario y mostrar éxito
                contactForm.reset();
                if (successMessage) {
                    successMessage.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto pronto.';
                    successMessage.removeAttribute('hidden');
                    successMessage.focus();
                }
            }
        });
    }

    // Función auxiliar para validar email
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});