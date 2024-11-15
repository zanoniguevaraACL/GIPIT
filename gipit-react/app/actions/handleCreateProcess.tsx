"use server";

export const handleCreateProcess = async (formData: FormData) => {
  try {
    // Log the form data entries for debugging
    const formEntries = Array.from(formData.entries());
    console.log("Form Data Entries:", formEntries);

    // Convert FormData to a plain object
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data submitted:", data);

    // Ensure client ID is present and parse it as an integer
    const companyId = parseInt(data.client as string, 10);  // Parse client ID as integer

    // Log to confirm the company_id is correctly assigned
    console.log("Selected company ID:", companyId);

    // Validate if the company ID is correctly parsed
    if (isNaN(companyId)) {
      throw new Error("Invalid company ID.");
    }

    // Map the data to match your backend schema or Prisma model
    const mappedData = {
      job_offer: data.jobOffer, 
      job_offer_description: data.jobOfferDescription,
      company_id: companyId,  // Pass company_id as integer
      opened_at: data.openedAt ? new Date(data.openedAt) : null,
      closed_at: data.closedAt ? new Date(data.closedAt) : null,
      pre_filtered: data.preFiltered === 'true',
      status: data.status || 'pending',
    };

    console.log("Transformed Form Data submitted:", mappedData);

    // Send the data to the backend API
    const response = await fetch("http://localhost:3001/api/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mappedData),  // Send the mapped data
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating process:", errorData);
      throw new Error(errorData.error || "Unknown error creating process");
    }

    // Parse the response JSON data
    const result = await response.json();
    console.log("Process created successfully:", result);

    // Return success message and route for redirect
    return {
      message: "Proceso cargado exitosamente", // Success message in Spanish
      route: "/process",  // Redirect route (adjust as necessary)
    };

  } catch (error) {
    // Log the error for debugging
    console.error("Error creating process:", error);
    // Return a structured error message
    throw new Error(`Error creating process: ${error.message || "Unknown error"}`);
  }
};
