const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token requerido' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const { data, error } = await supabase
            .from('users')
            .select('id, role, name')
            .eq('supabase_auth_id', decoded.id)
            .single();

        if (error || !data) {
            return res.status(403).json({ error: "Usuario no encontrado" });
        }

        req.user.db_id = data.id;
        req.user.role = data.role;
        req.user.name = data.name;

        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido' });
    }
};

module.exports = { authenticateToken };
