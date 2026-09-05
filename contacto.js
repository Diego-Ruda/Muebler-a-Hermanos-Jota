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

        fields.forEach((fieldName) => {
            const input = contactForm.querySelector(`#${fieldName}`);
            const errorSpan = contactForm.querySelector(`[data-error-for="${fieldName}"]`);

            if (!input.value.trim()) {
            isValid = false;
            if (errorSpan) errorSpan.textContent = 'Este campo es obligatorio.';
            } else if (fieldName === 'email' && !validateEmail(input.value)) {
            isValid = false;
            if (errorSpan) errorSpan.textContent = 'Ingresá un correo electrónico válido.';
            }
        });

        // Si todo está correcto, simular envío con éxito mediante el DOM
        if (isValid) {
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