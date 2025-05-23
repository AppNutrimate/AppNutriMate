export function formatWorkoutDate(isoString: string): string {
    const date = new Date(isoString);

    const datePart = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    const timePart = date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Sao_Paulo",
    });

    const [hour, minute] = timePart.split(":");

    const formattedTime = minute === "00" ? `${hour}h` : `${hour}h${minute}`;

    return `${formattedTime} | ${datePart}`;
}
