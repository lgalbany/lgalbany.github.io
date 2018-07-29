 #!/bin/bash

 for arx in $(ls *b.root|cut -db -f1); do
     ped $arx
 done
