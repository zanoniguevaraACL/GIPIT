"use server";


export const handleCreateProcess = async (formData: FormData) => {
    try {
      // Convert the form data to a plain object
      const data = Object.fromEntries(formData.entries());
      
      // Log the form data for debugging
      console.log("Form Data submitted:", data);
      
      // Map form data keys to match the Prisma model (snake_case)
      const mappedData = {
        job_offer: data.jobOffer, // Map 'jobOffer' to 'job_offer'
        job_offer_description: data.jobOfferDescription, // Map 'jobOfferDescription' to 'job_offer_description'
        company_id: data.client, // Assuming 'client' is the company ID
        opened_at: data.openedAt ? new Date(data.openedAt) : null, // Handle any Date fields
        closed_at: data.closedAt ? new Date(data.closedAt) : null,
        pre_filtered: data.preFiltered === 'true', // Convert string to boolean
        status: data.status || 'pending', // Default status if none is provided
      };
  
      // Log the transformed data for debugging
      console.log("Transformed Form Data submitted:", mappedData);
  
      // Send the mapped data to the backend
      const response = await fetch("http://localhost:3001/api/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mappedData),
      });
  
      // Check if the response is successful (status code 2xx)
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating process:", errorData);
        throw new Error(errorData.error || "Unknown error creating process");
      }
  
      // Parse the response JSON data
      const result = await response.json();
      console.log("Process created successfully:", result);
  
      // Return the result (this can be handled in the component or elsewhere)
      return result;
    } catch (error) {
      // Log the error for debugging
      console.error("Error creating process:", error);
      // Rethrow the error so it can be handled or displayed in the UI
      throw new Error(`Error creating process: ${error.message || "Unknown error"}`);
    }
  };
  
  
  