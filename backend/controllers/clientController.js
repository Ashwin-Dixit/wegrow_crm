const supabase = require("../config/supabase");
const { createNotification } = require("../services/notificationServices");
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
        .json({
          success: false,
          message: "Could not fetch clients details, try again later!",
        });
    }
    const { data: clients, error: clientsError } = await supabase
      .from("clients")
      .select(`*, employees (full_name, employee_id)`)
      // .eq("account_manager", employee.id)
      .order("created_at", { ascending: false });
    if (clientsError) {
      console.log("error in fetching clients", clientsError);
      return res
        .status(400)
        .json({
          success: false,
          message: `Error in fetching clients! ${clientsError.message}`,
        });
    }
    const clientsArray = [];
    clients.forEach((client) => {
      clientsArray.push({
        id: client.id,
        name: client.name,
        company: client.company,
        industry: client.industry,
        email: client.email,
        phone: client.phone,
        contractValue: client.contract_value,
        revenue: client.revenue,
        accountManager: client.employees.full_name,
        status: client.status,
        notes: client.notes,
        employeeId: client.employees.employee_id,
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
    industry,
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
        .json({
          success: false,
          message: "Could not create client try again later",
        });
    }
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .insert({
        name: name,
        company: company,
        industry: industry,
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
        .json({
          success: false,
          message: `Error in creating client, try again later! ${clientError.message}`,
        });
    }
    await createNotification({
      title: "Client Added",
      message: `${name} from ${company} was added as a new client`,
      type: "client",
    });
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
