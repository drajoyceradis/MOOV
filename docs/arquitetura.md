# Arquitetura MOOV

## Tese

O MOOV é uma camada leve de rastreabilidade técnico-documental da transição assistencial.

Não substitui MV, Rede Bem Estar, regulação ou prontuário.

## Camadas

### 1. Ponta operacional

- Links seguros temporários.
- Microformulários por perfil.
- Poucos campos.
- Microeventos objetivos.

### 2. Camada de dados

Entidades principais:

1. Evento de transição.
2. Unidade/serviço.
3. Recurso operacional.
4. Microevento.

### 3. Painel gestor

- Mapa.
- Status.
- Linha do tempo.
- Indicadores.
- Gargalos.
- Alertas.

## LGPD

Princípios:

- minimização de dados;
- pseudonimização;
- controle por perfil;
- logs;
- tokens temporários;
- exposição mínima de dados sensíveis.

O motorista não deve ver: nome completo, CPF, CNS, CID, diagnóstico, exames, história clínica ou prontuário.
