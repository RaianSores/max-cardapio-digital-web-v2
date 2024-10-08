import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import StorageService from "../../utils/StorageService";

import {
    Container,
    ConfigForm,
    FormTitle,
    FormGroup,
    Label,
    Input,
    Select,
    Button,
    RefreshIcon,
    LoadingContainer
} from "./styles";
import { getEmpresa } from "@/services/empresaService";

function Config() {
    const router = useRouter();

    useEffect(() => {
        fetchConfigurations();
    }, []);

    const fetchConfigurations = async () => {
        const ipUrl = "192.168.0.231"
        const porta = "9999"
        const idEmpresa = "1"
        const idVendedor = "7"
        const numMesa = "5"

        await StorageService.setItem("ipUrl", ipUrl);
        await StorageService.setItem("porta", porta);
        await StorageService.setItem("idEmpresa", idEmpresa);
        await StorageService.setItem("idVendedor", idVendedor);
        await StorageService.setItem("numMesa", numMesa);

        const response = await axios.get(`http://${ipUrl}:${porta}/v2/auth`);
        await StorageService.setItem("token", response.data.token);
        router.push('/cardapio');

    };

    return (
        <>
        </>
    );
}

export default Config;
