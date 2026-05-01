const handleOpenpayWebhook = async (req, res) => {
    try {
        const event = req.body;

        console.log("🔴 Webhook recibido de Openpay:", event.type);

        if (event.type === 'charge.succeeded') {
            const charge = event.data.object;

            // Aquí actualizaremos la base de datos (Supabase) más adelante
            console.log(`✅ Pago confirmado: ${charge.id} - Monto: $${charge.amount}`);
            
            // Enviar confirmación por WhatsApp (lo haremos después)
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error("Error en webhook:", error);
        res.status(500).send('Error');
    }
};

module.exports = { handleOpenpayWebhook };
