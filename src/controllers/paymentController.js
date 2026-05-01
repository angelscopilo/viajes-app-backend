const { createOxxoCharge } = require('../services/openpayService');

const createDeposit = async (req, res) => {
    try {
        const { amount, tripId, description } = req.body;

        const customer = {
            name: req.user.name || "Cliente",
            email: req.user.email,
            phone_number: req.user.phone
        };

        const charge = await createOxxoCharge(
            amount,
            description || `Depósito Viaje ${tripId}`,
            customer
        );

        res.json({
            success: true,
            payment_id: charge.id,
            payment_method: charge.method,
            reference: charge.payment_method?.reference || null,
            amount: charge.amount,
            message: "Cargo creado exitosamente. Usa el código de Oxxo o paga con tarjeta."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al procesar el pago" });
    }
};

module.exports = { createDeposit };
