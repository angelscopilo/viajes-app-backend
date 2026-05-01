const supabase = require('../config/supabase');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email, password, name, phone, role = 'client' } = req.body;

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) throw authError;

        const { data, error } = await supabase
            .from('users')
            .insert([{
                supabase_auth_id: authData.user.id,
                name,
                email,
                phone,
                role
            }])
            .select()
            .single();

        res.status(201).json({
            success: true,
            message: "Usuario registrado correctamente",
            user: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        // Buscar usuario en nuestra tabla
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('role, name')
            .eq('supabase_auth_id', data.user.id)
            .maybeSingle();   // <-- Cambiado a maybeSingle

        const role = userData?.role || 'client';
        const name = userData?.name || data.user.email;

        const token = jwt.sign(
            { 
                id: data.user.id, 
                email: data.user.email,
                role: role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ 
            success: true,
            token,
            user: { 
                ...data.user, 
                role: role,
                name: name 
            }
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { register, login };
