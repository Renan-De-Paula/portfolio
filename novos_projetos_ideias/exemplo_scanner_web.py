import requests  # Importa a biblioteca 'requests' para fazer requisições HTTP (acessar sites).
import socket    # Importa a biblioteca 'socket' para testar conexões de rede (ex: portas abertas).
import ssl       # Importa a biblioteca 'ssl' para lidar com certificados de segurança (HTTPS).
from urllib.parse import urlparse  # Importa 'urlparse' para extrair o domínio de uma URL completa.

def verificar_cabecalhos_seguranca(url):
    """
    Função que recebe uma URL e verifica quais cabeçalhos de segurança estão presentes.
    """
    print(f"\n[+] Verificando cabeçalhos de segurança para: {url}") # Imprime no console qual URL está sendo verificada.
    
    try: # Inicia um bloco de tratamento de erros, caso o site esteja fora do ar.
        resposta = requests.get(url, timeout=5) # Faz uma requisição GET para a URL, aguardando no máximo 5 segundos.
        cabecalhos = resposta.headers # Pega todos os cabeçalhos (headers) da resposta do servidor.
        
        # Lista de cabeçalhos importantes para segurança web
        cabecalhos_importantes = [
            'Strict-Transport-Security', # Força o uso de HTTPS
            'X-Frame-Options',           # Protege contra Clickjacking (site aberto dentro de um iframe falso)
            'X-Content-Type-Options'     # Evita que o navegador tente adivinhar o tipo do arquivo, reduzindo riscos de XSS
        ]
        
        # Estrutura de repetição que passa por cada cabeçalho importante da nossa lista
        for cabecalho in cabecalhos_importantes: 
            if cabecalho in cabecalhos: # Se o cabeçalho estiver presente na resposta do servidor
                print(f"  [OK] {cabecalho}: Encontrado (Valor: {cabecalhos[cabecalho]})") # Avisa que encontrou e mostra o valor.
            else: # Se o cabeçalho NÃO estiver presente
                print(f"  [ALERTA] {cabecalho}: NÃO Encontrado (Risco de Segurança!)") # Exibe um alerta de segurança.
                
    except requests.exceptions.RequestException as e: # Se houver erro na requisição (site fora do ar, erro de digitação, etc)
        print(f"  [ERRO] Não foi possível acessar {url}. Detalhe: {e}") # Exibe a mensagem de erro.


def verificar_porta(ip, porta):
    """
    Função que tenta conectar em um IP e Porta específicos para ver se a porta está aberta.
    """
    # Cria um 'socket' (um ponto final de comunicação de rede usando IPv4 e protocolo TCP)
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
    s.settimeout(2) # Define um limite de tempo (timeout) de 2 segundos para não ficar travado tentando conectar.
    
    try: # Inicia o bloco de tentativa
        # Tenta conectar no IP e na porta. Se der certo, retorna 0. Se falhar, retorna um código de erro.
        resultado = s.connect_ex((ip, porta)) 
        
        if resultado == 0: # Se o resultado for 0, significa que a conexão foi bem sucedida.
            print(f"  [ALERTA] A porta {porta} está ABERTA no IP {ip}.") # Avisa que a porta está aberta.
        else: # Se o resultado não for 0...
            print(f"  [OK] A porta {porta} está FECHADA ou filtrada.") # Avisa que a porta está segura/fechada.
            
    except Exception as e: # Se der algum erro inesperado durante a conexão...
        print(f"  [ERRO] Erro ao testar porta {porta}: {e}") # Mostra o erro.
        
    finally: # Bloco que executa independentemente de ter dado certo ou errado.
        s.close() # Fecha a conexão do socket para liberar recursos do sistema.


def scanner_principal(url):
    """
    Função principal que orquestra as chamadas do scanner.
    """
    print("Iniciando Scanner de Vulnerabilidades Básico...\n") # Mensagem de início.
    
    # 1. Verifica os cabeçalhos de segurança HTTP da URL
    verificar_cabecalhos_seguranca(url) 
    
    # Extrai apenas o domínio da URL. Ex: "https://www.google.com" vira "www.google.com"
    dominio = urlparse(url).netloc 
    
    # Se o domínio não estiver vazio, prossegue para os testes de rede
    if dominio:
        print(f"\n[+] Verificando portas no domínio: {dominio}") # Imprime o domínio que será testado.
        try:
            # Pega o IP (número) associado àquele domínio (nome) usando o DNS.
            ip_do_alvo = socket.gethostbyname(dominio) 
            print(f"  IP resolvido: {ip_do_alvo}") # Mostra o IP encontrado.
            
            # Lista de portas que queremos testar (21=FTP, 22=SSH, 80=HTTP, 443=HTTPS)
            portas_para_testar = [21, 22, 80, 443] 
            
            # Repetição para testar cada uma das portas da lista
            for porta in portas_para_testar:
                verificar_porta(ip_do_alvo, porta) # Chama a função que testa a porta.
                
        except socket.gaierror: # Erro específico caso não consiga resolver o domínio (site não existe).
            print(f"  [ERRO] Não foi possível resolver o IP para o domínio {dominio}")
    else:
        print("\n[ERRO] URL inválida. Certifique-se de incluir 'http://' ou 'https://'.")


# Ponto de entrada do script. Só executa o código abaixo se o arquivo for rodado diretamente.
if __name__ == "__main__":
    # Define a URL alvo que será testada. (Pode ser mudada para o site que você quiser testar)
    alvo = "https://renan-de-paula.github.io/portifolio/" 
    
    # Chama a função principal passando o alvo
    scanner_principal(alvo)
