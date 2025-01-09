export type JellyBelly = {
    beanId: number;
    groupName: string[];
    ingredients: string[];
    flavorName: string;
    description: string;
    colorGroup: string;
    backgroundColor: string;
    imageUrl: string;
    glutenFree: boolean;
    sugarFree: boolean;
    seasonal: boolean;
    kosher: boolean;
  }
  
  export type JellyBellyResponse = {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    items:JellyBelly[];
  }
  