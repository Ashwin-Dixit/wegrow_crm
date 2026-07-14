const supabase = require("../config/supabase");
const { createNotification } = require("../services/notificationServices");
exports.getClients = async (req, res, next) => {
  try {
    const { data: clients, error: clientsError } = await supabase
      .from("clients")
      .select(`*, employees (full_name, employee_id)`)
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
        ...client,
        contractValue: client.contract_value,
        accountManager: client.employees.full_name,
        employeeId: client.employees.id,
        companyEmployeeId: client.employees.employee_id,
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
    accountManager,
  } = req.body;
  let assigned
  if(req.user.role==="admin"){
    assigned = accountManager
  }
  else{
    assigned = req.user.employeeId
  }
  try {
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
        account_manager: assigned,
      })
      .select(`*, employees (full_name, employee_id)`)
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
    createNotification({
      title: "Client Added",
      message: `${name} from ${company} was added as a new client`,
      type: "client",
    });
    return res.status(200).json({
      success: true,
      message: "Client created successfully",
      client: {
        ...client,
        accountManager: client.employees.full_name,
        employeeId: client.employees.employee_id,
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
exports.updateClient = async (req, res, next) => {
  const {name,company,industry,status,email,phone,
        notes,contractStart,contractEnd,contractValue, accountManager} = req.body
  const {id} = req.params
  try {
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .update({
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
        account_manager: accountManager,
      })
      .eq("id", id)
      .select(`*, employees (full_name, employee_id)`)
      .single();
    if (clientError) {
      console.log("error in updating client", clientError);
      return res
        .status(400)
        .json({
          success: false,
          message: `Error in updating client, try again later! ${clientError.message}`,
        });
    }
    return res.status(200).json({
      success: true,
      message: "Client updated successfully",
      client: {
        ...client,
        accountManager: client.employees.full_name,
        employeeId: client.employees.employee_id,
        contractValue: client.contract_value,
        contractStart: new Date(client.contract_start),
        contractEnd: new Date(client.contract_end),
        createdAt: new Date(client.created_at),
        updatedAt: new Date(client.updated_at),
      },
    });
  } catch (error) {
    console.log("error in updating client", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
exports.deleteClientById = async (req, res, next) => {
  const clientId = req.params.id;
    if (!clientId) {
      return res.status(400).json({
        success: false,
        message: "Client ID is required",
      });
    }
    try {
      const { data: client, error: clientError } = await supabase
        .from("clients")
        .select("id")
        .eq("id", clientId)
        .single();
  
      if (clientError || !client) {
        return res.status(404).json({
          success: false,
          message: "Client not found",
        });
      }
      const { error } = await supabase.from("clients").delete().eq("id", clientId);
  
      if (error) {
        return res.status(400).json({
          success: false,
          message: `Error in deleting client! ${error.message}`,
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Client deleted successfully",
        clientId,
      });
    } catch (error) {
      console.log("error in deleting client", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
};
