const supabase = require('../config/supabase');

const createTrip = async (req, res) => {
    try {
        const { title, destination, start_date, end_date, deposit_amount } = req.body;

        const { data, error } = await supabase
            .from('trips')
            .insert([{
                organizer_id: req.user.db_id,
                title,
                destination,
                start_date,
                end_date,
                deposit_amount,
                status: 'active'
            }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({
            success: true,
            message: "Viaje creado exitosamente",
            trip: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getTrips = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('trips')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTrip, getTrips };
