FROM node:22-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm build

CMD [ "pnpm", "start:dev" ]