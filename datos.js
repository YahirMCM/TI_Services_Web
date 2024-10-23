document.addEventListener('DOMContentLoaded', () => {
    const invoiceForm = document.getElementById('invoiceForm');
    const customerType = document.getElementById('customerType');
    const individualFields = document.getElementById('individualFields');
    const organizationFields = document.getElementById('organizationFields');
    const itemsContainer = document.getElementById('items');
    const totalAmount = document.getElementById('totalAmount');
    const addItemButton = document.getElementById('addItem');

    // Mostrar campos específicos según tipo de cliente
    customerType.addEventListener('change', (event) => {
        const value = event.target.value;
        if (value === 'individuo') {
            individualFields.style.display = 'block';
            organizationFields.style.display = 'none';
        } else if (value === 'organizacion') {
            organizationFields.style.display = 'block';
            individualFields.style.display = 'none';
        } else {
            individualFields.style.display = 'none';
            organizationFields.style.display = 'none';
        }
    });

    // Actualizar total dinámicamente
    itemsContainer.addEventListener('input', updateTotal);

    function updateTotal() {
        let total = 0;
        const items = document.querySelectorAll('.item');

        items.forEach(item => {
            const quantity = item.querySelector('.quantity').value || 0;
            const price = item.querySelector('.price').value || 0;
            total += quantity * price;
        });

        totalAmount.textContent = total.toFixed(2);
    }

    // Enviar la factura por correo
    invoiceForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const customerData = customerType.value === 'individuo' 
            ? { type: 'Individuo', name: document.getElementById('name').value, dni: document.getElementById('dni').value }
            : { type: 'Organización', name: document.getElementById('orgName').value, taxId: document.getElementById('taxId').value };

        const email = document.getElementById('email').value;
        const items = [];

        document.querySelectorAll('.item').forEach(item => {
            const productName = item.querySelector('.product-name').value;
            const quantity = item.querySelector('.quantity').value;
            const price = item.querySelector('.price').value;

            items.push({ productName, quantity, price });
        });

        const invoiceData = {
            customer: customerData,
            email,
            items,
            total: totalAmount.textContent
        };

        console.log('Datos de la factura:', invoiceData);
        alert(`Factura enviada con éxito a ${email}`);

        // Aquí meteremos si es que se hace, lo de el emailjs para que mande los correos electrónicos
    });
});
