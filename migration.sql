BEGIN;
--
-- Add field uuid to emailverification
--
ALTER TABLE "accounts_emailverification" ADD COLUMN "uuid" uuid DEFAULT 'e78d1171-a964-493a-836a-32656adb572b'::uuid NOT NULL;
ALTER TABLE "accounts_emailverification" ALTER COLUMN "uuid" DROP DEFAULT;
COMMIT;
