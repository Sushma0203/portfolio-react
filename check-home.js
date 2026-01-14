const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const info = await prisma.home_infos.findFirst();
    console.log(JSON.stringify(info, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
        , 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
