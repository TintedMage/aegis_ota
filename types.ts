export interface AegisNode {
  ip: string;
  meshId: string;
  nodeName: string;
  status: "online" | "updating" | "offline";
}