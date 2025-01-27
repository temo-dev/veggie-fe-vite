import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import useBrand from "@/utils/hooks/useBrand";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";

const importBrandByExel = async (file: File) => {
    const res = http.post(API_ENDPOINTS.BRAND, file)
}