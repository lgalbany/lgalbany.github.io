// graph.C programa que plota tota la superficie 
// estudiada per cada longitud d'ona

#include "Riostream.h"
#include "TRint.h"
#include "TStyle.h"
#include "TCanvas.h"
#include "TStyle.h"
#include "TH2D.h"
#include "Style.C"
using namespace std;

int main(int argc, char* argv[])
{
  if (argc !=  3)
    {
      printf("\n You must write 'graph nfiltre nwavelength'\n");
      printf("where nfiltre is the filter number (2, 3 or 4)\n");
      printf("and nwavelenght is the wavelength you want to plot\n\n");
      return 0;
    }
  
  TRint *App = new TRint ("App",0, 0, 0, 0, kTRUE);

  string num,h,q=" ",tit="matrixn.dat";
  num=argv[1];
  tit.replace(6,1,num);
  
  const char *arx = tit.c_str();
  Int_t n=32,ent,cont,w,sel=2000;
  
  if (num=="2")
    {
      ent=31;
      cont=300;
    }
  if (num=="3")
    {
      ent=71;
      cont=400;
    }
  if (num=="4") 
    {
      ent=101;
      cont=700;
    }
  
  if (num!="2" && num!="3" && num!="4")
    {
      cout<<endl<<"Filters: (de 5 en 5 nm)"<<endl<<"2   300-450nm"<<endl<<"3   400-750nm"<<endl<<"4   700-1200nm"<<endl<<endl;
      return 0;
    }
  
  w = atoi (argv[2]);
  
  for (Int_t l=0;l<ent;l++)
    {
      if (w==cont) sel=l;
      cont=cont+5;
    }
  if (sel==2000)
    {
      cout<<endl<<"Aquesta longitud no hi es en aquest filtre"<<endl;
      return 0;
    }
  
  float V[ent][n][n],Ve[ent][n][n], l[ent],max=0; 
  FILE *mat;
  mat=fopen(arx,"r");
  
  for (Int_t i=0;i<ent;i++)
    {
      fscanf (mat, "%f ",&l[i]);
      for (Int_t j=0;j<n;j++)
	{
	  for (Int_t k=0;k<n;k++)
	    {
	      fscanf (mat, "%f %f ",&V[i][j][k],&Ve[i][j][k]);
	    }
	}
      fscanf (mat,"\n");
    } 
  fclose(mat);
  
  cout<<max;
  
  q.replace(0,1,argv[1]);
  q.replace(1,1,argv[2]);
  h="Filter  Wavelength  ";
  h.replace(7,0,argv[1]);
  h.replace(20,1,argv[2]);
  const char *hh = h.c_str(); 
  const char *qq = q.c_str();
  
  TCanvas* p = new TCanvas(qq,"Spectrum",200,10,1000,500); 
  p->Divide(2,1);
  Style();
  p->SetBorderMode(0); 
  TH2D* hist = new TH2D("hist1",hh,n-1,0,64,n-1,0,64);
  
  for(Int_t j = 0; j<n; j++)
    {
      for (Int_t k = 0; k<n; k++)
	{
	  if (V[sel][j][k]>max) max =V[sel][j][k];
	}
    }
  
  for(Int_t j = 0; j<n; j++)
    {
      for (Int_t k = 0; k<n; k++)
	{
	  hist->SetBinContent(j,k,V[sel][j][k]/max);
	}
    }
  p->cd(1)->SetBorderMode(0);
  hist->Draw("colz");
  p->cd(2)->SetBorderMode(0);
  hist->Draw("surf");
  hist->GetXaxis()->SetTitle("Steps (mm)");
  hist->GetXaxis()->SetLabelFont(42);
  hist->GetXaxis()->SetLabelSize(0.03);
  hist->GetXaxis()->SetTitleOffset(1.3); 
  hist->GetYaxis()->SetTitle("Steps (mm)");
  hist->GetYaxis()->SetLabelFont(42);
  hist->GetYaxis()->SetLabelSize(0.03);
  hist->GetYaxis()->SetTitleOffset(1.3); 
  hist->GetZaxis()->SetTitle("Voltage (%)");
  hist->GetZaxis()->SetLabelFont(42);
  hist->GetZaxis()->SetLabelSize(0.03);
  hist->GetZaxis()->SetTitleOffset(1.3);
  
  p->Modified();
  App->Run();
}
