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

function Config({ navigation }: any) {
    const router = useRouter();
    const [ipUrl, setIpUrl] = useState("");
    const [porta, setPorta] = useState("");
    const [idEmpresa, setIdEmpresa] = useState("");
    const [idVendedor, setIdVendedor] = useState("");
    const [numMesa, setNumMesa] = useState("");
    const [loading, setLoading] = useState(false);
    const [empresaData, setEmpresaData] = useState<any[]>([]);

    const fetchEmpresaData = async () => {
        try {
            const response = await axios.get(
                `http://${ipUrl}:${porta}/v1/public/empresa/consultar`
            );
            if (response.data && response.data.length > 0) {
                setEmpresaData(response.data);
            } else {
                //showToast("Dados da empresa não encontrados!", "error");
            }
        } catch (error) {
            alert("Erro: Não foi possível carregar os dados da empresa. Verifique a conexão e tente novamente.");
        }
    };

    const fetchItems = async () => {
        try {
            await fetchEmpresaData();
            setTimeout(() => {
                setLoading(false);
            }, 880);
        } catch (error) {
            //showToast("Erro ao buscar dados da API!", "error");
        }
    };

    useEffect(() => {
        fetchConfigurations();
    }, []);

    const fetchConfigurations = async () => {
        setLoading(true);
        try {
            const ipUrl = await StorageService.getItem("ipUrl");
            const porta = await StorageService.getItem("porta");
            const idEmpresa = await StorageService.getItem("idEmpresa");
            const idVendedor = await StorageService.getItem("idVendedor");
            const numMesa = await StorageService.getItem("numMesa");

            if (ipUrl) setIpUrl(ipUrl);
            if (porta) setPorta(porta);
            if (idEmpresa) setIdEmpresa(idEmpresa);
            if (idVendedor) setIdVendedor(idVendedor);
            if (numMesa) setNumMesa(numMesa);

            if (ipUrl && porta && idEmpresa && idVendedor && numMesa) {
                try {
                    setLoading(true);
                    const config = {
                        headers: { terminal: "WEB_BROWSER", empId: idEmpresa },
                    };
                    const response = await axios.get(`http://${ipUrl}:${porta}/v1/auth`, config);
                    await StorageService.setItem("token", response.data.token);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1800);
                    router.push('/cardapio');
                } catch (error) {
                    alert("Erro ao buscar dados. Por favor, tente novamente.");
                }
            }
            setTimeout(() => {
                setLoading(false);
            }, 1800);
        } catch (error) {
            alert("Erro ao buscar dados do StorageService!");
        }
    };

    const salvarConfiguracao = async () => {
        try {
            await StorageService.setItem("ipUrl", ipUrl);
            await StorageService.setItem("porta", porta);
            await StorageService.setItem("idEmpresa", idEmpresa);
            await StorageService.setItem("idVendedor", idVendedor);
            await StorageService.setItem("numMesa", numMesa);
            try {
                const config = {
                    headers: { terminal: "WEB_BROWSER", empId: idEmpresa },
                };
                const response = await axios.get(`http://${ipUrl}:${porta}/v1/auth`, config);
                await StorageService.setItem("token", response.data.token);
                navigation.navigate("Home");
            } catch (error) {
                alert("Erro ao buscar dados. Por favor, tente novamente.");
            }
        } catch (error) {
            alert("Erro ao salvar dados. Por favor, tente novamente.");
        }
    };

    return (
        <Container>
            {loading ? (
                <LoadingContainer>
                    <p>Carregando...</p>
                </LoadingContainer>
            ) : (
                <ConfigForm>
                    <FormTitle>Configurações</FormTitle>

                    <FormGroup>
                        <Label>IP/URL (sem http)</Label>
                        <Input
                            type="text"
                            placeholder="Digite aqui..."
                            value={ipUrl}
                            onChange={(e) => setIpUrl(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Porta</Label>
                        <Input
                            type="text"
                            placeholder="Digite aqui..."
                            value={porta}
                            onChange={(e) => setPorta(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>ID Empresa</Label>
                        <Select value={idEmpresa} onChange={(e) => setIdEmpresa(e.target.value)}>
                            <option value="">Selecione...</option>
                            {empresaData.map((empresa, index) => (
                                <option key={index} value={empresa.empId}>
                                    {empresa.fantasia}
                                </option>
                            ))}
                        </Select>
                        <RefreshIcon onClick={fetchItems}>
                            <FontAwesomeIcon icon={faSync} width={20} height={20} />
                        </RefreshIcon>
                    </FormGroup>

                    <FormGroup>
                        <Label>ID Vendedor</Label>
                        <Input
                            type="text"
                            placeholder="Digite aqui..."
                            value={idVendedor}
                            onChange={(e) => setIdVendedor(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Número Mesa</Label>
                        <Input
                            type="text"
                            placeholder="Digite aqui..."
                            value={numMesa}
                            onChange={(e) => setNumMesa(e.target.value)}
                        />
                    </FormGroup>

                    <Button onClick={salvarConfiguracao}>Gravar/Continuar</Button>
                </ConfigForm>
            )}
        </Container>
    );
}

export default Config;
