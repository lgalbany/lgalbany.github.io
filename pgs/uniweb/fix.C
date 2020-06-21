// fix.C programa que canvia les comes per punts en un arxiu de dades i 
// també els passa d'arxius de text a arxius de root

#include "Riostream.h"
#include <TFile.h>
#include <TTree.h>
using namespace std;

int main(int argc, char* argv[])
{
  if (argc !=  2)
     {
       printf("You must write 'fix arxiuambcomes.txt'\n\n");
       return 0;
     }
 
  FILE *arxi, *arxo;
  char c,cf;
  string tit;
  Int_t n=0,nlines=0;
  Double_t x,y;

  tit=argv[1];
  n= tit.size();
  tit.replace(n-4,4,".punt");  
  const char *fin = tit.c_str();

  arxi=fopen(argv[1],"r");
  arxo=fopen(fin,"w");  

  while(!feof(arxi))
    {
      c=fgetc(arxi);
      if (c!=',') {cf=c;}
      else {cf='.';}
      if (!feof(arxi)) fputc(cf,arxo); 
    }

  fclose(arxi);
  fclose(arxo);   

  ifstream in;
  in.open(fin);

  tit.erase (0,23);   
  n= tit.size() ;

  if (tit[13]=='A') tit.replace(9,12,"a.root");
  if (tit[13]=='B') tit.replace(9,12,"b.root");
  if (tit[10]=='S') tit.replace(9,n-9,"l.root");

  TFile *f = new TFile(fin,"RECREATE");
  TTree *t = new TTree("arbre","passar d'arxiu a vector");
  t->Branch("x",&x,"x/D");
  t->Branch("y",&y,"y/D");

  while (1)
    {
      in >> x >> y;
      if (!in.good()) break;
      t->Fill();
      nlines++;
    }

  in.close();
  f->Write();

  tit=argv[1];
  n= tit.size();
  tit.replace(n-4,4,".punt");  
  remove(fin);
}
