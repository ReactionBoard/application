export class Validator {
  public ENV_Variables() {
    if (!process.env.DISCORD_TOKEN) {
      console.error(`missing env: DISCORD_TOKEN`);
    }

    if (!process.env.CLIENT_ID) {
      console.error("missing env: CLIENT_ID");
    }
  }
}
