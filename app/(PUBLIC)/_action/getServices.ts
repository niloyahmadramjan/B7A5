"use server";

export const getPublicServices = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {

  const params = new URLSearchParams();


  if (query?.searchItem) {
    params.set(
      "searchItem",
      query.searchItem as string
    );
  }


  if (query?.category) {
    params.set(
      "category",
      query.category as string
    );
  }


  if (query?.location) {
    params.set(
      "location",
      query.location as string
    );
  }


  if (query?.minPrice) {
    params.set(
      "minPrice",
      query.minPrice as string
    );
  }


  if (query?.maxPrice) {
    params.set(
      "maxPrice",
      query.maxPrice as string
    );
  }


  if (query?.rating) {
    params.set(
      "rating",
      query.rating as string
    );
  }


  if (query?.page) {
    params.set(
      "page",
      query.page as string
    );
  }


  if (query?.limit) {
    params.set(
      "limit",
      query.limit as string
    );
  }


  if (query?.sortBy) {
    params.set(
      "sortBy",
      query.sortBy as string
    );
  }


  if (query?.sortOrder) {
    params.set(
      "sortOrder",
      query.sortOrder as string
    );
  }



  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/services/all-services?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      // for dynamic search/filter
      cache: "no-store",

    }
  );


  if (!res.ok) {
    return {
      success: false,
      message: "Failed to fetch services",
    };
  }


  return await res.json();
};