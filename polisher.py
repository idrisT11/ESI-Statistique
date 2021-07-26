import tabula as tb
import json
import sys


if len(sys.argv) < 2:
	
	print("\n Usage : python3 "+ sys.argv[0] +" nbPages filename.pdf")

	exit()



pages = [ k for k in range(6) ]
files = [ fileName for fileName in  sys.argv ]

files.pop(0)

ID_string = 'N°'


def getRawTable(regions_raw):

	"""getting a table from the mess outputed by the pdfConverter"""

	regions = []

	for i in range(0, len(regions_raw)):
		for column in range(len(regions_raw[i]['data'])):
			tab = []

			for champs in range(len(regions_raw[i]['data'][column])):
				tab.append(regions_raw[i]['data'][column][champs]['text'])

			regions.append(tab)

	return regions

def polishTables(regions):

	corruptedZones = [] #To store the corrupted Zones index
	finalTable = []

	header = regions[0]

	for line in regions:

		if line[0] == ID_string:	
			# In case we a in a "header of table" line type, like : ["N°", "Nom", ...., "Moyenne"]

			corruptedZones = []

			i = 0

			for zone in line:
				#Here we look for corrupted zones, for example, the pdfConverter could output : 
				#["N°", "Nom", "", "Prénom", "", "Moyenne"], where le null-strings are corrupted value

				if zone == None or len(zone) == 0:
					
					corruptedZones.append(i)
					
				i += 1


		else:

			# We create our finalArray line by line
			finalLine = []

			for zoneId in range( len( line ) ):
				
				if (zoneId-1) not in corruptedZones:	# why (-1) you would ask ? Myself, I don't really know

				#If the column (zone) is not corrupted, we add it to the final array
					finalLine.append(line[zoneId])

			finalTable.append(finalLine)

	#We generate a header for our table
	for zone in header:
		
		if zone == None or len(zone) == 0:
			header.remove(zone)


	finalTable.insert(0, header)
	return finalTable

def exportTable(fileName, table):
	
	f = open(fileName, 'w')

	f.write(json.dumps(table))

	f.close()

for fileName in files:

	regions_raw = tb.read_pdf(fileName, pages="all", output_format="json")

	raw_table = getRawTable(regions_raw)

	print(raw_table)

	table = polishTables(raw_table)

	exportTable(fileName.replace('.pdf', '.json'), table)

	print("File : " + fileName + " converted.")

print("Dayen")


