import {MigrationInterface, QueryRunner} from "typeorm";

export class allTables1645707546563 implements MigrationInterface {
    name = 'allTables1645707546563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genres" ("ddc" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_f90cde1a6b2a392dca5598db681" PRIMARY KEY ("ddc"))`);
        await queryRunner.query(`CREATE TABLE "user_books" ("id" SERIAL NOT NULL, "checkout_date" TIMESTAMP NOT NULL DEFAULT now(), "return_date" date NOT NULL DEFAULT '2022-03-03T12:59:09.739Z', "renewed" boolean NOT NULL DEFAULT false, "returned" boolean NOT NULL DEFAULT false, "userId" uuid, "bookId" uuid, CONSTRAINT "PK_629bc1a648860619b0f75f5dfe6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "author" character varying NOT NULL, "pages" integer NOT NULL, "published_year" integer NOT NULL, "loaned" boolean NOT NULL, "genreDdc" character varying, "adminId" uuid, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "rating" integer NOT NULL, "reviewContent" character varying NOT NULL, "userId" uuid, "bookId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fine" ("id" SERIAL NOT NULL, "worth" integer NOT NULL, "total" integer NOT NULL, "bookId" uuid, "userId" uuid, CONSTRAINT "REL_15c99bad9513a0382e83bdd71d" UNIQUE ("bookId"), CONSTRAINT "PK_13acc5a2e27270b02717cfa9b30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "authorized" boolean NOT NULL, "isAdm" boolean NOT NULL, "addressId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "streetNumber" character varying NOT NULL, "district" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zipcode" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emailCode" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "generatedDate" TIMESTAMP NOT NULL DEFAULT '2022-02-24T12:59:09.911Z', "userId" uuid, CONSTRAINT "REL_8a435e28861d030872a89b7255" UNIQUE ("userId"), CONSTRAINT "PK_3899a9a19fbb020f13d87c98ecb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_books" ADD CONSTRAINT "FK_89eac0a6cb08bda7516c319c914" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_books" ADD CONSTRAINT "FK_daa39d872eb7e189a1fea05be7c" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_78963cf74b9f9aef066155923bc" FOREIGN KEY ("genreDdc") REFERENCES "genres"("ddc") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_fa97b85cdd3b3e5bc08acbcd0b5" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_cab4e55252a9c18a27e81415299" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fine" ADD CONSTRAINT "FK_15c99bad9513a0382e83bdd71dc" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fine" ADD CONSTRAINT "FK_4510640288d31f0d0dd7143a8d6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emailCode" ADD CONSTRAINT "FK_8a435e28861d030872a89b72556" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emailCode" DROP CONSTRAINT "FK_8a435e28861d030872a89b72556"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "fine" DROP CONSTRAINT "FK_4510640288d31f0d0dd7143a8d6"`);
        await queryRunner.query(`ALTER TABLE "fine" DROP CONSTRAINT "FK_15c99bad9513a0382e83bdd71dc"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_cab4e55252a9c18a27e81415299"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_fa97b85cdd3b3e5bc08acbcd0b5"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_78963cf74b9f9aef066155923bc"`);
        await queryRunner.query(`ALTER TABLE "user_books" DROP CONSTRAINT "FK_daa39d872eb7e189a1fea05be7c"`);
        await queryRunner.query(`ALTER TABLE "user_books" DROP CONSTRAINT "FK_89eac0a6cb08bda7516c319c914"`);
        await queryRunner.query(`DROP TABLE "emailCode"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "fine"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "user_books"`);
        await queryRunner.query(`DROP TABLE "genres"`);
    }

}
