const baseUrl = 'http://localhost:8000';  
import {Graph} from "./graph/GraphObjects"; 

export default class Api {

  public static async createWorkflow(graph:Graph): Promise<Response> {
    return await fetch(baseUrl + "/graph", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graph),
    });
  }

  public static async getWorkflow(id:string): Promise<Graph> {
    return await fetch(baseUrl + `/graph/${id}`, {
      method: "GET"
    }) .then((g) =>
      Object.assign( new Graph(), g ) 
    );
  }

}
