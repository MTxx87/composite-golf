# Composite Golf

## Installation
- clone the repository
- `cd composite-golf`
- `npm install`

## Usage
### Help guide
`node . --help`

### Result
Compute composite colour given backdrop and overlay.   

`node . result <backdrop> <overlay>`

###### Example
`node . result 'rgba(69,60,250,1)' 'rgba(0,255,64,0.5)'`   

### Overlay
Compute possible overlays given backdrop and resulting colour.

`node . overlay <backdrop> <result> [alpha]`

###### Example

`node . overlay 'rgba(69,60,250,1)' 'rgb(68,159,171)' --alpha=100  `

###### Options

`--alpha`   
Number of alpha value to be taken into consideration.   
Can be 10 or 100.
