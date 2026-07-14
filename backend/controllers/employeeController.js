const supabase = require('../config/supabase')
exports.getEmployees = async (req, res) => {
    try {
        const { data, error } = await supabase.from('employees').select('*')
        if(error){
            return res.status(400).json({
                success: false,
                message: error.message,
            })
        }
        return res.status(200).json({
            success: true,
            employees: data,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}