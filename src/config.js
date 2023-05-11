// export const alibiAddress = "https://gekonnt-handeln.de:8446"
// export const backendAddress = "https://gekonnt-handeln.de:444"
export let alibiAddress;
export let backendAddress;

if (process.env.NODE_ENV === "production") {
    alibiAddress = "https://gekonnt-handeln.de:8446";
    backendAddress = "https://gekonnt-handeln.de:444";
} else {
    alibiAddress = "http://localhost:5001";
    backendAddress = "http://localhost:5000";
}