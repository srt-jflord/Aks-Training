# AKS Training Example Project
Simple "ToDo" application used as the basis for our AKS training sessions.

**Components:**
 - UserService
 - ToDoService
 
# Getting Started

Configure the solution to use multiple startup projects so that it launches both projects. The **ToDoService** is dependent on the **UserServce**.
It can take a few minutes on first launch to retore all the npm and NuGet packages.

You will need two blank SqlServer databases:
- UserServiceDb
- ToDoServiceDb

Configure each project accordingly via the "**appsettings.json**" file.

**Example (UserService):**

```json
{
	"DataAccess": {
		"ConnectionString": "MyConectionString"
	},
	...
}
```

Example (ToDoService):

```json
{
	"DataAccess": {
		"ConnectionString": "MyConnectionString",
		"UserServiceBaseUrl": "http://localhost:64666"
	},
	...
}
```

**UserService:** http://localhost:64666
**ToDoService:** http://localhost:63666

# Usage

Create some users in the UserService. Once you have at least one user, you can use the ToDoService to create ToDo items for the users. User are identified via email address in the ToDoService.