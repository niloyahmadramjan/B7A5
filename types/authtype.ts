export type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

/**
 * {
    "success": true,
    "statusCode": 200,
    "message": "User register successfully",
    "data": {
        "user": {
            "id": "938dae2a-9338-431b-8f6f-531d61ba9934",
            "name": "technician",
            "email": "technicia5n@gmail.com",
            "phone": "01812345678",
            "role": "TECHNICIAN",
            "status": "ACTIVE",
            "createdAt": "2026-07-29T16:09:04.202Z",
            "updatedAt": "2026-07-29T16:09:04.202Z",
            "technicianProfile": {
                "id": "8994864c-c909-4b03-9182-ef1a37bd28a6",
                "userId": "938dae2a-9338-431b-8f6f-531d61ba9934",
                "bio": "",
                "experience": 0,
                "location": "",
                "rating": 0,
                "totalReviews": 0,
                "createdAt": "2026-07-29T16:09:06.237Z",
                "updatedAt": "2026-07-29T16:09:06.237Z"
            }
        }
    }
}
*/

export type RegisterState = {
  success: boolean;
  statusCode: number;
  message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            role: string;
            status: string;
            createdAt: string;
            updatedAt: string;
        };
    };  
};
