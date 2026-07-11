const supabase = require("../config/supabase");
exports.getClients = async (req, res, next) => {
  try {
    const { data: employee, error: employeeError } = await supabase
      .from("employees")
      .select("id, full_name, employee_id")
      .eq("auth_user_id", req.user.id)
      .single();
    if (employeeError) {
      console.log("error in fetching employee", employeeError);
      return res
        .status(400)
        .json({ success: false, message: employeeError.message });
    }
    const { data: clients, error: clientsError } = await supabase
      .from("clients")
      .select("*")
      .eq("account_manager", employee.id)
      .order("created_at", { ascending: false });
    if (clientsError) {
      console.log("error in fetching clients", clientsError);
      return res
        .status(400)
        .json({ success: false, message: clientsError.message });
    }
    const clientsArray = [];
    clients.forEach((client) => {
      clientsArray.push({
        id: client.id,
        name: client.name,
        company: client.company,
        email: client.email,
        phone: client.phone,
        contractValue: client.contract_value,
        revenue: client.revenue,
        accountManager: employee.full_name,
        status: client.status,
        notes: client.notes,
        employeeId: employee.employee_id,
        contractStart: new Date(client.contract_start),
        contractEnd: new Date(client.contract_end),
        createdAt: new Date(client.created_at),
        updatedAt: new Date(client.updated_at),
      });
    });
    return res.status(200).json({
      success: true,
      message: "Clients fetched successfully",
      clients: clientsArray,
    });
  } catch (error) {
    console.log("error in fetching clients", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
exports.createClient = async (req, res, next) => {
  const {
    name,
    company,
    email,
    phone,
    status,
    notes,
    contractStart,
    contractEnd,
    contractValue,
  } = req.body;
  try {
    const { data: employee, error: employeeError } = await supabase
      .from("employees")
      .select("id, full_name, employee_id")
      .eq("auth_user_id", req.user.id)
      .single();
    if (employeeError) {
      console.log("error in fetching employee", employeeError);
      return res
        .status(400)
        .json({ success: false, message: employeeError.message });
    }
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .insert({
        name: name,
        company: company,
        email: email,
        phone: phone,
        status: status,
        notes: notes,
        contract_start: new Date(contractStart).toISOString() || new Date(),
        contract_end: new Date(contractEnd).toISOString() || new Date(),
        contract_value: contractValue,
        account_manager: employee.id,
      })
      .select("*")
      .single();
    if (clientError) {
      console.log("error in creating client", clientError);
      return res
        .status(400)
        .json({ success: false, message: clientError.message });
    }
    return res.status(200).json({
      success: true,
      message: "Client created successfully",
      client: {
        ...client,
        accountManager: employee.full_name,
        employeeId: employee.employee_id,
        contractValue: client.contract_value,
        contractStart: new Date(client.contract_start),
        contractEnd: new Date(client.contract_end),
        createdAt: new Date(client.created_at),
        updatedAt: new Date(client.updated_at),
      },
    });
  } catch (error) {
    console.log("error in creating client", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
