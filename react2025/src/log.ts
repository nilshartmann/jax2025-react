const componentBadgeStyles: Record<ComponentName, string> = {
  "Component A":
    "background-color: oklch(88.2% 0.059 254.128); color: oklch(54.6% 0.245 262.881);  padding: 2px; border-radius: 2px",
  "Component B":
    "background-color: oklch(91% 0.096 180.426); color: oklch(60% 0.118 184.704);  padding: 2px; border-radius: 2px",
};

const msgStyles: Record<ComponentName, string> = {
  "Component A": "color: oklch(54.6% 0.245 262.881);",
  "Component B": "color: oklch(60% 0.118 184.704);",
};

type ComponentName = "Component A" | "Component B";

export function logger(componentName: ComponentName) {
  const log = function log(...args: any[]): void {
    const t = new Date();
    const timestamp = `${t.toLocaleTimeString()}.${t.getMilliseconds()}`;

    const timeStyle = "color: #E5E7EB;  padding: 2px; border-radius: 2px";

    const componentStyle = componentBadgeStyles[componentName];
    const msgStyle = msgStyles[componentName];
    const formattedArgs = args
      .map((arg) =>
        typeof arg === "object" ? JSON.stringify(arg) : String(arg),
      )
      .join(" ");

    console.log(
      "%c%s%c %s",
      //
      componentStyle,
      componentName,
      msgStyle,
      formattedArgs,
    );
  };

  return log;
}
