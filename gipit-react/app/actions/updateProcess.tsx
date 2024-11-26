"use server";

export const updateProcess = async (formData: FormData, processId: string) => {
  try {
    // Extract jobOffer (description) from form data
    const jobOffer = formData.get("jobOffer") as string | null;

    // Ensure jobOffer is provided
    if (!jobOffer) {
      throw new Error("Missing required field: jobOffer");
    }

    // Assuming job_offer_description is the same as job_offer
    const jobOfferDescription = jobOffer;

    // Prepare the payload for the update request
    const payload = {
      job_offer: jobOffer,
      job_offer_description: jobOfferDescription,
      // No company_id is added here since it's not required
    };

    // Make the PUT request to update the job offer for the given processId
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/process/${processId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error updating job offer: ${errorText}`);
    }

    // Return success message and redirect URL
    return {
      message: "Job offer updated successfully",
      route: `/process/${processId}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return {
        message: `Error updating job offer: ${error.message}`,
        route: `/process/${processId}`,
      };
    } else {
      console.error("Unknown error:", error);
      return {
        message: "An unknown error occurred",
        route: `/process/${processId}`,
      };
    }
  }
};
