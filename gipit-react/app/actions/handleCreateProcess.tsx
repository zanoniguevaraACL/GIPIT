"use server";

export const handleCreateProcess = async (formData: FormData) => {
  try {
    const formEntries = Array.from(formData.entries());
    console.log("Form Data Entries:", formEntries);

    const data = Object.fromEntries(formData.entries());
    console.log("Form Data submitted:", data);

    const companyId = parseInt(data.client as string, 10); 

    console.log("Selected company ID:", companyId);

    if (isNaN(companyId)) {
      throw new Error("Invalid company ID.");
    }

    const mappedData = {
      job_offer: data.jobOffer, 
      job_offer_description: data.jobOfferDescription,
      company_id: companyId,  
      opened_at: data.openedAt ? new Date(data.openedAt) : null,
      closed_at: data.closedAt ? new Date(data.closedAt) : null,
      pre_filtered: data.preFiltered === 'true',
      status: data.status || 'pending',
    };

    console.log("Transformed Form Data submitted:", mappedData);

    const response = await fetch("http://localhost:3001/api/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mappedData),  
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating process:", errorData);
      throw new Error(errorData.error || "Unknown error creating process");
    }

    const result = await response.json();
    console.log("Process created successfully:", result);

    return {
      message: "Proceso cargado exitosamente", 
      route: "/process", 
    };

  } catch (error) {
    console.error("Error creating process:", error);
    throw new Error(`Error creating process: ${error.message || "Unknown error"}`);
  }
};
