# TNT Digital

Site institucional da TNT Digital, de Anadia, Portugal. Apresenta os serviços de presença local no Google e publicidade no Instagram e Facebook.

## Estrutura

- `public/`: página, estilos, JavaScript, logótipo e fontes locais.
- `wrangler.jsonc`: configuração de publicação com Cloudflare Workers Static Assets.

O site é estático: não necessita de instalação de dependências nem de compilação. A pasta de recursos estáticos é `public`.

## Publicação

A integração do repositório com Cloudflare Workers Builds pode publicar o site com `npx wrangler deploy`, utilizando a configuração na raiz. O nome do Worker na configuração deve corresponder ao projeto conectado na Cloudflare.

## Funcionalidades e privacidade

- Layout adaptável a dispositivos móveis e computadores.
- Temas claro e escuro, com preferência guardada no armazenamento local do navegador quando disponível.
- Navegação por teclado e respeito pela preferência de movimento reduzido.
- Sem formulários, cookies ou rastreadores incluídos no site.
- Os contactos abrem o Instagram, um serviço externo com as suas próprias condições e política de privacidade.

As licenças das fontes estão em `public/assets/fonts/`.
