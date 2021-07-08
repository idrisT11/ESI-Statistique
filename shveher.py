import json
import sys

if len(sys.argv) < 2:
    print("Usage: python3 " + sys.argv[0] + " fileName.json ")

    exit()

files = [ fileName for fileName in sys.argv ]

files.pop(0)


def getZoneToDelete():
    zonesToDelete = []
    nbZonesDelete = 0
    
    print("Enter the number of zones to delete : ")
    try:
        nbZonesDelete = int( input() )
    except:
        print("\t Please enter an integer.")

    for i in range(nbZonesDelete):
        zoneName = input("Enter a zone name : ")
        zonesToDelete.append( zoneName )

    return zonesToDelete

def getZoneToRename():
    zonesToRename = []
    nbZonesRename = 0
    
    print("Enter the number of zones to rename : ")

    try:

        nbZonesRename = int( input() )

    except:

        print("\t Please enter an integer.")

    for i in range(nbZonesRename):
        zoneName = input("Enter the zone name : ")

        zoneNewName = input("Enter the new zone name : ")


        zonesToRename.append( ( zoneName, zoneNewName ) )

    return zonesToRename



def removeColumn(columnName, table, fileName):

    try:
        columnIndex = table[0].index( columnName )
        
        for line in table:
            
            del line[ columnIndex ]

    except:

        print("ERROR : Name " + columnName + " doesn't exist in file " + fileName + " , DELETE ERROR ")
        

def renameColumn(columnName, newName, table, fileName):

    try:
        columnIndex = table[0].index( zoneName )
        
        table[0][columnIndex] = newName

    except:

        print("ERROR : Name " + columnName + " doesn't exist in file " + fileName + " , RENAME ERROR")
        
    
        

zonesToDelete = getZoneToDelete()
zonesToRename = getZoneToRename()

#DELETE ZONES

for zoneName in zonesToDelete:

    for file in files :
        content = []

        try:
            f = open(file, 'r')
            content = json.loads( f.read() )
            f.close()

        except:
            print("ERROR : File izan reading error ")
            exit()

        print("File : " + file + ", header : ", content[0])
        removeColumn(zoneName, content, file)

        try:
            f = open(file, 'w')
            f.write(json.dumps(content))
            f.close()

        except:
            print("ERROR : File izan writing error \n")
            exit()

if len(zonesToDelete) > 0:
    print("Dayen, the zones have succesfully been deleted.")


#RENAME ZONES
for zoneName, newZoneName in zonesToRename:
    

    for file in files :
        content = []

        try:
            f = open(file, 'r')
            content = json.loads( f.read() )
            f.close()

        except:
            print("ERROR : File izan reading error ")
            exit()

        print("File : " + file + ", header : ", content[0])
        renameColumn(zoneName, newZoneName, content, file)

        try:
            f = open(file, 'w')
            f.write(json.dumps(content))
            f.close()

        except:
            print("ERROR : File izan writing error ")
            exit()    

if len(zonesToRename) > 0:

    print("Dayen, the zones have succesfully been renamed.")


print("Dayen")



        
            











